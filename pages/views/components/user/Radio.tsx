import { NextPage, NextPageContext } from 'next';

type PageProps = {
  title: string;
};

// extending the default next context type
type PageContext = NextPageContext & {
  query: PageProps;
};

const Radio: NextPage<PageProps> = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default Radio;
