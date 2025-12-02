import { FOOTER_DATA } from '@/constants/footer.constants';
import { TabContainerItem, TabsContainer } from './tabs-container';

const FooterTabs = () => {
  return (
    <TabsContainer>
      {FOOTER_DATA.map((footer) => (
        <TabContainerItem {...footer} key={footer.id} />
      ))}
    </TabsContainer>
  );
};

export default FooterTabs;
