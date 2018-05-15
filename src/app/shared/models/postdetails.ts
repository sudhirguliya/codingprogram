export class PostDetails {
    id: number;
    category_id: number;
    page_name: string;
    page_title: string;
    page_description: string;
    image_path: string;
    image_alt: string;
    image_title: string;

    constructor(data) {
        Object.assign(this, data);
    }

    getAddress() {
        //return `${this.address} ${this.city}, ${this.state} ${this.postalCode}`;
    }

}