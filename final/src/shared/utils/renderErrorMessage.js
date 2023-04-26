const errorTypes = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    NETWORK_ERROR: 'network-error',
    REQUIRED_FIELDS_MISSING: 'required-fields-missing',
    POST_NOT_FOUND: 'post-not-found',
    COMMENT_NOT_FOUND: 'comment-not-found',
    INVALID_TITLE: 'invalid-title',
    INVALID_CONTENT: 'invalid-content',
    INVALID_TAGS: 'invalid-tags',
    INVALID_IMAGE: 'invalid-images',
    FORBIDDEN: 'forbidden',
    INVALID_POST: 'invalid-post',
    DELETE_FAILED: 'delete-failed',
    CONTENT_TOO_LONG: 'content-too-long',
}

export default function renderErrorMessage(error) {
    switch(error) {
        case errorTypes.AUTH_MISSING:
            return 'Missing credentials. You must be logged in to play the game.';
        case errorTypes.AUTH_INSUFFICIENT:
            return 'Forbidden username. You cannot login as "dog".';
        case errorTypes.REQUIRED_USERNAME:
            return 'Invalid username. Username cannot be empty and can only contain letters and numbers.';
        case errorTypes.NETWORK_ERROR:
            return 'Network error. Please check your connection and try again.';
        case errorTypes.REQUIRED_FIELDS_MISSING:
            return 'Required fields missing.';
        case errorTypes.POST_NOT_FOUND:
            return 'Post not found.';
        case errorTypes.COMMENT_NOT_FOUND:
            return 'Comment not found.';
        case errorTypes.INVALID_TITLE:
            return 'Invalid title. Title cannot be empty and can only contain letters and numbers.';
        case errorTypes.INVALID_CONTENT:
            return 'Invalid content. Content cannot be empty and can only contain letters and numbers.';
        case errorTypes.INVALID_TAGS:
            return 'Invalid tags. Tags cannot be empty and can only contain letters and numbers.';
        case errorTypes.INVALID_IMAGE:
            return 'Invalid image. Images cannot be empty and can only contain letters and numbers.';
        case errorTypes.FORBIDDEN:
            return 'Forbidden. You cannot access this page.';
        case errorTypes.INVALID_POST:
            return 'Invalid post. Post cannot be empty and can only contain letters and numbers.';
        case errorTypes.DELETE_FAILED:
            return 'Delete failed. You cannot delete this post.';
        case errorTypes.CONTENT_TOO_LONG:
            return 'Content too long. Content cannot be longer than 100 characters.';
        default:
            return 'Unknown error.';
    }
}