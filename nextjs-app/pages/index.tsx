import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getSortedPostsData } from "../lib/post";
import homeStyle from "../styles/Home.module.css";

const Home = (props: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) => {
  return (
    <div className={homeStyle.container}>
      <Head>
        <title>Sooyoung</title>
      </Head>
      <section className={homeStyle.headingMd}>
        <p>[Sooyoung Self Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${homeStyle.headingMd} ${homeStyle.padding1px}`}>
        <h2 className={homeStyle.headingLg}>Blog</h2>
        <ul className={homeStyle.list}>
          {props.allPostsData.map((data) => (
            <li className={homeStyle.listItem} key={data.id}>
              <Link href={`/posts/${data.id}`}>
                <a>{data.title}</a>
              </Link>

              <br />
              <small className={homeStyle.lightText}>{data.date}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
