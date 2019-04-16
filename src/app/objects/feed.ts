export interface IFeed {
    name: string,
    source: string,
    url: string,
    coverPicture?:string,
    description?: string,
    pubDate: Date,
    expiredDate: Date,
}