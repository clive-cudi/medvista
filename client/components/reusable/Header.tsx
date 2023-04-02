
import Head from "next/head";

export interface Header_props {
    title?: string
    description?: string
    concatenateHeader?: boolean
    children?: any
}

export const Header = ({title, description, concatenateHeader = true, children}: Header_props): JSX.Element => {
    return (
        <Head>
            <title>{title ?? "Medvista"}</title>
            <meta name="description" content={description ?? "Your medical records, secure and accessible."} />
            <link rel="icon" href="/favicon.ico" />
            {children}
        </Head>
    )
}