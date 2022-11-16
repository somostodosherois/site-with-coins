import { SliceZone } from '@prismicio/react'

import BannerHome from '../components/BannerHome'
import Footer from '../components/Footer'
import Header from '../components/Header/Header'

import { createClient } from '../prismicio'
import { components } from '../slices'

const Page = ({ page, menu, metaTitle, metaDescription, slices }) => {
  if (!page) return null

  return (
    <>
      <Header metaTitle={metaTitle} metaDescription={metaDescription} menu={menu} />
      <BannerHome data={page?.data} />
      <SliceZone slices={slices} components={components} />
      <Footer />
    </>
  )
}

export default Page

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData })

  const page = await client.getSingle('homepage')
  const menu = await client.getSingle("menu");

  return {
    props: {
      page,
      menu: menu.data,
      metaTitle: page.data.meta_title,
      metaDescription: page.data.meta_description,
      slices: page.data.page_content
    },
  }
}
