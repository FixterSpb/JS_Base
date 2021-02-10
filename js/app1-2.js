"use strict";

// Конструктор в стиле es5

function Post(author, text, date) {
    this.author = author;
    this.text = text;
    this.date = date;
}

Post.prototype.edit = function (text) {
    this.text = text;
}

function AttachedPost(author, text, date) {
    Post.call(this, author, text, date);
    this.highlighted = false;
}

AttachedPost.prototype = Object.create(Post.prototype);
AttachedPost.prototype.constructor = AttachedPost;
AttachedPost.prototype.makeTextHighlighted = function () {
    this.highlighted = true;
}

const post1 = new Post("John", "Hello worls", "25.06.2020");

console.log(post1);
post1.edit("Lorem ipsum");
console.log(post1);

const attPost = new AttachedPost("Alex", "Какой-то текст", "Дата");
console.log(attPost);
attPost.makeTextHighlighted();
attPost.edit("Hello world");
console.log(attPost);

//Конструктор в стиле es6

class Post_es6 {
    constructor(author, text, date) {
        this.author = author;
        this.text = text;
        this.date = date;
    }

    edit(text) {
        this.text = text;
    }
}

class AttachePost_es6 extends Post_es6 {
    constructor(author, text, date) {
        super(author, text, date);
        this.highlighted = false;
    }

    makeTextHighlighted() {
        this.highlighted = true;
    }

}

const post_es6 = new Post_es6("John", "Hello worls", "25.06.2020");

console.log(post_es6);
post_es6.edit("Lorem ipsum");
console.log(post_es6);

const attPost_es6 = new AttachedPost("Alex", "Какой-то текст", "Дата");
console.log(attPost_es6);
attPost_es6.makeTextHighlighted();
attPost_es6.edit("Hello world");
console.log(attPost_es6);