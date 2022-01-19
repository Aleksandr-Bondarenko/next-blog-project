import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export const getStaticPaths = () => {
  const paths = getAllPostsIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
};

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        {/* <title>HELLO</title> */}
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        {/* <h1 className={utilStyles.headingXl}>HELLO</h1> */}
        <div className={utilStyles.lightText}>
          <Date dateStr={postData.date} />
          {/* <Date dateStr="2022-1-6" /> */}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
