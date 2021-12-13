import {
  Box,
  Heading,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { ContentTypes, IMovie } from "../../types";
import TabContent from "./TabContent";

interface Tab {
  label: string;
  contentList?: IMovie[];
  contentType: ContentTypes;
  onTabChange: (page: number) => any;
}

interface ContentSectionProps {
  title: string;
  tabs: Tab[];
}

export default function ContentSection({ title, tabs }: ContentSectionProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabsState, setTabsState] = useState<Tab[]>([]);

  const handleTabsChange = useCallback(
    async (index: number) => {
      if (tabs) {
        const { content } = await tabs[index].onTabChange(1);

        setTabIndex(index);
        const newTabs = [...tabs];
        newTabs[index] = {
          ...tabs[index],
          contentList: content,
        };

        setTabsState(newTabs);
      }
    },
    [tabs]
  );

  useEffect(() => {
    handleTabsChange(0);
  }, [tabs, handleTabsChange]);

  return (
    <Box maxW="100%" mt="6">
      <Flex direction="column">
        <Heading as="h3" fontSize="xl" fontWeight="500">
          {title}
        </Heading>
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          isLazy
          mt="4"
          index={tabIndex}
          onChange={handleTabsChange}>
          <TabList overflowX="auto" py="4" px="2">
            {tabsState.map((tab, index) => (
              <Tab
                key={index}
                whiteSpace="nowrap"
                fontSize={["sm", "md"]}
                mr="2">
                {tab.label}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabsState.map((tab, index) => (
              <TabPanel key={index}>
                <TabContent
                  contentList={tab.contentList || []}
                  contentType={tab.contentType}
                />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
}
