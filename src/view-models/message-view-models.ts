export type MessageViewModelOrderById = 'created_at';
/**
 * A View Model of a `Message`.
 */
export class MessageViewModel {
    id: string;
    /**
     * The Space this message belongs to.
     */
    space_id: string;
    /**
     * The user who sent the message.
     */
    user_id: string;
    /**
     * The message contents.
     */
    content: string;
    /**
     * When this message was sent.
     */
    created_at: Date;
};

export class CreateMessageViewModel {
    /**
     * The message contents.
     */
    content: string;
};