export class CommentModel {
    public content: string;
    public name;
    public owner;
    public isApproved;
    public rating: number;
    public timestamp;

    toObject(): object {
        return {
            content: this.content,
            name: this.name,
            owner: this.owner,
            isApproved: this.isApproved,
            rating: this.rating,
            timestamp: this.timestamp
        };
    }
}
