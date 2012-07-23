


impressSlidesAdapter = {
    buildSlides: function(slides) {
        impressSlidesAdapter.addTitleSlide(slides);
    },
    addTitleSlide: function(slides) {
        var template = [
            {tag:"h1", html:"#{title}"}
        ];
        $("#title").json2html(slides, template);
    }
}
