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
    }
}