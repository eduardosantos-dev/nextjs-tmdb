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
import { useEffect, useState } from "react";
import { UseQueryOptions } from "react-query";
import { IMovie } from "../../types";
import TabContent from "./TabContent";

interface Tab {
  label: string;
  contentList?: IMovie[];
  contentType: "movie" | "show" | "person";
  onTabChange: (page: number) => any;
}

interface ContentSectionProps {
  title: string;
  tabs: Tab[];
}

export default function ContentSection({ title, tabs }: ContentSectionProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabsState, setTabsState] = useState<Tab[]>([]);

  useEffect(() => {
    handleTabsChange(0);
  }, [tabs]);

  const handleTabsChange = async (index: number) => {
    const { content } = await tabs[index].onTabChange(1);

    setTabIndex(index);
    const newTabs = [...tabs];
    newTabs[index] = {
      ...tabs[index],
      contentList: content,
    };

    setTabsState(newTabs);
  };

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
          <TabList>
            {tabsState.map((tab, index) => (
              <Tab key={index}>{tab.label}</Tab>
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
