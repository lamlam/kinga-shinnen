import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import type { VFC } from 'react';
import { RefreshIcon, ExternalLinkIcon } from '@heroicons/react/solid';

function shuffle(arr: string[]): string[] {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

type GreetingProps = {
  greeting: string;
  reloadEventHandler: VoidFunction;
};

const AtariGreeting: VFC<GreetingProps> = ({
  greeting,
  reloadEventHandler,
}) => {
  return (
    <>
      <div className="mb-8">
        <h1 className="md:text-9xl text-7xl font-bold text-red-500 md:mb-4 mb-2">
          {greeting}
        </h1>
        <p className="md:text-xl text-center text-lg font-bold text-red-500">
          今年もよろしくお願いします。
        </p>
      </div>
      <button onClick={reloadEventHandler} aria-label="reload">
        <img src="/matsu.svg" alt="松飾り" className="w-10 h-10" />
      </button>
    </>
  );
};

const HazureGreeting: VFC<GreetingProps> = ({
  greeting,
  reloadEventHandler,
}) => {
  return (
    <>
      <div className="mb-8">
        <h1 className="md:text-9xl text-7xl font-bold">{greeting}</h1>
      </div>
      <button onClick={reloadEventHandler} aria-label="reload">
        <RefreshIcon className="w-10 h-10 text-gray-500" />
      </button>
    </>
  );
};

type FooterProps = {};
const Footer: VFC<FooterProps> = () => {
  return (
    <footer className="justify-self-end flex justify-center mb-4">
      <a
        href="https://github.com/lamlam/kinga-shinnen"
        className="text-center underline"
        target="_blank"
      >
        GitHub
      </a>
      <ExternalLinkIcon className="w-4 h-4" />
    </footer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const siteURL: string =
    process.env.SITE_URL || process.env.VERCEL_URL || 'http://localhost:3000';
  return {
    props: { siteURL },
  };
};

const Top: NextPage = ({
  siteURL,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [greeting, setGreeting] = useState<string>('？？？？');
  const createRandomGreeting: VoidFunction = useCallback(() => {
    setGreeting(shuffle(['謹', '賀', '新', '年']).join(''));
  }, []);

  useEffect(() => {
    createRandomGreeting();
  }, []);

  return (
    <>
      <Head>
        <title>謹賀新年</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="preload" href="/matsu.svg" as="image" />
        <meta property="og:url" content={siteURL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={siteURL + '/cover.png'} />
        <meta property="og:title" content="謹賀新年" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center">
        {greeting === '謹賀新年' ? (
          <AtariGreeting
            greeting={greeting}
            reloadEventHandler={createRandomGreeting}
          />
        ) : (
          <HazureGreeting
            greeting={greeting}
            reloadEventHandler={createRandomGreeting}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Top;
