console.log(marked('I am using __markdown__.'));
$( document ).ready ( function() {
    $.ajaxSetup({ cache: false });
    var documentRoot = 'infrastructure-doc';
    var documents = {
        'database_server.mkd': {
            title: 'Database Server',
        },
        'gluster.mkd': {
            title: 'GlusterFS',
        },
        'webserver.mkd': {
            title: 'Web Server',
        },
        'rocketlauncher.mkd': {
            title: 'RocketLauncher',
        }
    };
    var menu = $('#documentd-navigation ul');
    $.each(documents, function(key, value) {
        menu.append('<li><a href="#" data-documentd="' + key + '" class="documentd-link">' + value.title + '</a></li>');
    });
    $(".documentd-link").click(function() {
        var mkdFile = $(this).data("documentd");
        var mkdPath = documentRoot + "/" + mkdFile;
        $.get(mkdPath, function(data) {
            html = marked(data);
            $(".documentation").html(html);
        });
    });
});

