exports.compareLists = (list1, list2) => {
    list1.sort();
    list2.sort();

    if (list1.length !== list2.length) {
        return false;
    }

    for (let i = 0; i < list1.length; i++) {
        if (list1[i] !== list2[i]) {
            return false;
        }
    }

    return true;
}
