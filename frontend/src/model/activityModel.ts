type activityModelProps = {
    email: string;
    action: string;
    content: string;
    fromColumnTitle: string | null;
    toColumnTitle: string | null;
    createdAt: Date | null;
};
export default class ActivityModel {
    email: string;
    action: string;
    content: string;
    fromColumnTitle: string | null;
    toColumnTitle: string | null;
    createdAt: Date | null;

    constructor({
        email,
        action,
        content,
        fromColumnTitle,
        toColumnTitle,
        createdAt,
    }: activityModelProps) {
        this.email = email;
        this.action = action;
        this.content = content;
        this.fromColumnTitle = fromColumnTitle;
        this.toColumnTitle = toColumnTitle;
        this.createdAt = createdAt;
    }
}
