$( document ).ready ( function() {
    $.ajaxSetup({ cache: false });
    var r = new marked.Renderer()
    r.blockcode = function(code, lang) {
        return highlight(lang, code).value;
    }
    var documentRoot = 'infrastructure-doc',
        menu = $('#documentd-navigation ul');

    $.get('documentd.json', function(data) {
        var documents = data.documents,
            title = data.title;
        $.each(documents, function(key, value) {
            menu.append('<li><a href="#" data-documentd="' + key + '" class="documentd-link">' + value.title + '</a></li>');
        });

        $.get(documentRoot + '/README.md', function(data) {
            html = marked(data, {renderer: r});
            $(".documentation").html(html);
        });

        $(".documentd-link").click(function() {
            var mkdFile = $(this).data("documentd"),
                mkdPath = documentRoot + "/" + mkdFile;
            $.get(mkdPath, function(data) {
                html = marked(data, {renderer: r});
                $(".documentation").html(html);
            });
        });
        document.title = title;
        $('a.navbar-brand').html(title);
        $('a.navbar-brand').click(function() {
            $.get(documentRoot + '/README.md', function(data) {
                html = marked(data, {renderer: r});
                $(".documentation").html(html);
            });
        });
    });
});

