function dataFunction() {
    var details = JSON.parse(localStorage.getItem('users'));
    details = { objectss: details };
    return details.objectss;
}

$(document).ready(function() {
    var dataa = JSON.parse(localStorage.getItem('users'));
    var services = function() {
        var source = $("#document-template").html();
        var template = Handlebars.compile(source);
        var html = template({ objects: dataa });
        $('#DocumentResults').html(html);
    };

    services();
    $(".myButton").on("click", function() {
        var value = $("#login").val(),
            usrFlag = false;
        var result = dataFunction();;
        result.forEach(function(no) {
            if (no.login === value) {
                usrFlag = true;
            }
        });
        if (usrFlag)
            alert("User already added")
        else {
            var item = [];
            $.ajax({
                url: "https://api.github.com/users/" + value,
                data: {
                    format: 'json'
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(thrownError);
                }
            }).then(function(data) {
                item = JSON.parse(localStorage.getItem('users'));
                item.push(data);
                localStorage.clear();
                localStorage.setItem('users', JSON.stringify(item));
                location.reload();
            });
        }


    });
});

function cross(userid) {
    console.log(userid);
    var result = dataFunction();
    var arr = [];
    result.forEach(function(no) {
        if (no.id != userid) {
            arr.push(no);
        }
    });
    localStorage.setItem('users', JSON.stringify(arr));
    location.reload();
};

function openInNewTab(id) {
    var url = null;
    var result = dataFunction();;
    result.forEach(function(no) {
        if (no.id === id) {
            url = no.html_url;
        }
    });
    var win = window.open(url, '_blank');
    win.focus();
};

function sorting(types) {
    var sortArray = dataFunction();
    if (types == 'name') {
        sortArray.sort(function(a, b) {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        });

    } else if (types == 'location') {
        sortArray.sort(function(a, b) {
            if (a.location < b.location)
                return -1;
            if (a.location > b.location)
                return 1;
            return 0;
        });

    } else if (types == 'followers') {
        sortArray.sort(function(a, b) {
            if ((a.followers) < (b.followers))
                return 1;
            if ((a.followers) > (b.followers))
                return -1;
            return 0;
        });

    }
    localStorage.setItem('users', JSON.stringify(sortArray));
    location.reload();
};
