import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/post";
import homeStyle from "../../styles/Home.module.css";

const Post = (props: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) => {
  return (
    <div className={homeStyle.container}>
      <Head>
        <title>{props.postData.title}</title>
      </Head>
      <article>
        <h1 className={homeStyle.headingXl}>{props.postData.title}</h1>
        <div className={homeStyle.lightText}>{props.postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: props.postData.contentHtml }} />
      </article>
    </div>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (props) => {
  const postData = await getPostData(props.params.id as string);
  return {
    props: {
      postData,
    },
  };
};
