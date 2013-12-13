$( document ).ready ( function() {
    $.ajaxSetup({ cache: false });
    var documentRoot = 'infrastructure-doc',
        menu = $('#documentd-navigation ul');

    $.get('documentd.json', function(data) {
        var documents = data.documents;
        $.each(documents, function(key, value) {
            menu.append('<li><a href="#" data-documentd="' + key + '" class="documentd-link">' + value.title + '</a></li>');
        });

        $.get(documentRoot + '/README.md', function(data) {
            html = marked(data);
            $(".documentation").html(html);
        });

        $(".documentd-link").click(function() {
            var mkdFile = $(this).data("documentd"),
                mkdPath = documentRoot + "/" + mkdFile;
            $.get(mkdPath, function(data) {
                html = marked(data);
                $(".documentation").html(html);
            });
        });
    });
});

