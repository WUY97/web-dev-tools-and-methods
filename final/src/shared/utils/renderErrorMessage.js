export default function renderErrorMessage(error) {
    if (error === 'auth-missing') {
        return 'Missing credentials. You must be logged in to play the game.';
    } else if (error === 'auth-insufficient') {
        return 'Forbidden username. You cannot play the game as "dog".';
    } else if (error === 'required-username') {
        return 'Invalid username. Username cannot be empty and can only contain letters and numbers.';
    } else if (error === 'required-word') {
        return 'Word missing. You must provide a word.';
    } else if (error === 'invalid-word') {
        return 'Invalid word. Word can only contain letters. And it mush be 5 letters long.';
    } else if (error === 'network-error') {
        return 'Network error. Please check your connection and try again.';
    } else if (error === 'forbidden-word') {
        return 'Forbidden word. You cannot use that word.';
    } else if (error === 'required-fields-missing') {
        return 'Required fields missing. Please fill out all the fields.';
    } else if (error === 'post-not-found') {
        return 'Post not found. The post you are trying to access does not exist.';
    } else if (error === 'comment-not-found') {
        return 'Comment not found. The comment you are trying to access does not exist.';
    } else if (error === 'post-not-found') {
        return 'Post not found. The post you are trying to access does not exist.';
    } else if (error === 'invalid-title') {
        return 'Invalid title. Title must be between 1 and 50 characters long.';
    } else if (error === 'invalid-content') {
        return 'Invalid content. Content must be between 1 and 150 characters long.';
    } else if (error === 'invalid-tags') {
        return 'Invalid tags. Tags must be between 1 and 5, start with "#" and separated by spaces.';
    } else if (error === 'invalid-image') {
        return 'Invalid image. Images must be less than 5MB and less than 5 images.';
    } else if (error === 'forbidden') {
        return 'Forbidden. You are not allowed to perform this action.';
    } else if (error === 'invalid-post') {
        return 'Invalid post. You cannot edit a post that is not yours.';
    } else if (error === 'delete-failed') {
        return 'Delete failed. Please try again.';
    }
}