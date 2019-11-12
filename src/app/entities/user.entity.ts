export class User {

    public display_name: string;

    public external_urls: { spotify: string };

    public followers: { total: number };

    public href: string;

    public id: string;

    public images: [{ heigth: number, width: number, url: string }];

    public type: string;

    public uri: string;

    constructor() {
        this.display_name = null;
        this.external_urls = null;
        this.followers.total = 0;
        this.href = null;
        this.id = null;
        this.images = [{
            heigth: null,
            width: null,
            url: null
        }];
        this.type = null;
        this.uri = null;
    }

}
