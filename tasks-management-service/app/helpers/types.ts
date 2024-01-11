export interface uploadImageType {
    Bucket: string
    Key: string
    ContentType: string
    Body: Buffer
}

export interface responseUploadImageType {
    ETag: string,
    VersionId: string,
    Location: string,
    key: string,
    Key: string,
    Bucket: string
}

