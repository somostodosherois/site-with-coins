import { PrismicRichText, SliceZone } from '@prismicio/react'
import { Grid } from '@mui/material';

import { createClient } from '../../prismicio'
import { components } from '../../slices'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import TitlePage from '../../components/TitlePage';
import TitleSession from '../../components/TitleSession/TitleSession';

const Page = ({ page, menu, metaTitle, metaDescription, slices }) => {
    if (!page || !menu) return null

    const data = page?.data || {}

    return (
        <>
            <Header metaTitle={metaTitle} metaDescription={metaDescription} menu={menu} />

            <div className="max-w-7xl mx-auto lg:items-center">
                <div className="max-w-2xl mx-auto lg:max-w-none ml-8 mr-4 md:mr-0 text-lg md:text-xl text-gray-800">
                    {/* <TitlePage title={data.page_name} description={data.description[0]?.text} /> */}

                    <TitleSession title={data.donations_title} />
                    <p className="text-lg md:text-xl text-gray-600 lg:mx-auto leading-8">
                        {data.donations_description1}
                    </p>

                    <Grid className='block md:flex mt-8 gap-x-24'>
                        {data.donations_type.map(({ image, label }, index) => (
                            <Grid className='flex items-center justify-left md:justify-center gap-x-4' key={index}>
                                <img src={image.url} />
                                <span>{label}</span>
                            </Grid>
                        ))}
                    </Grid>

                    <p className="text-lg md:text-xl text-gray-600 lg:mx-auto leading-8 mt-8">
                        {data.donations_description2}
                    </p>

                </div>
            </div>

            <SliceZone slices={slices} components={components} />

            <Footer />
        </>
    )
}

export default Page

export async function getStaticProps({ previewData }) {
    const client = createClient({ previewData })

    const page = await client.getSingle('transparency')
    const menu = await client.getSingle("menu");

    return {
        props: {
            page,
            menu: menu.data,
            metaTitle: page.data.meta_title,
            metaDescription: page.data.meta_description,
            slices: page.data.body || []
        },
    }
}
