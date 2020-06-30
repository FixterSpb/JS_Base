let mover = {

    isActive(event) {
        return event.classList.contains('cell-active');
    },

    onClick(event) {

        console.log(event);
        let parentNode = event.target.parentNode;

        if (!this.isActive(parentNode)) {
            parentNode.classList.add('cell-active');
        } else {
            parentNode.classList.remove('cell-active');
        }
    },

}