import { books } from "./data.js";

export let bookData = {
    page: 1,
    matches: books,
    setPage: function(newPage) {
        throw new Error("This variable cannot be changed.");
    },
    setMatches: function(newMatches) {
        throw new Error("This variable cannot be changed.");
    },
    getPage: function() {
      return this.page;
    },
    getMatches: function() {
      return this.matches;
    }
  };