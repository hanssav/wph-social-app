import { FOOTER_DATA } from '@/constants/footer.constants';
import { TabContainerItem, TabsContainer } from './tabs-container';
import { useRouter } from 'next/navigation';

const FooterTabs = () => {
  const router = useRouter();

  const handleClick = (action?: string) => {
    if (action) router.push(action);
  };

  return (
    <TabsContainer>
      {FOOTER_DATA.map((footer) => (
        <TabContainerItem
          {...footer}
          key={footer.id}
          onClick={() => handleClick(footer.action)}
        />
      ))}
    </TabsContainer>
  );
};

export default FooterTabs;
