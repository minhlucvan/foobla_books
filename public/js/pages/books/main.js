$(function () {
    var category = getParameterByName("c");
    var published = getParameterByName("p");
    var author = getParameterByName("a");
    var key_word = getParameterByName("k");

    var rowTemplate = `
       <tr>
        <td data-row="index"></td>
        <td data-field="name"></td>
        <td data-field="published_year"></td>
        <td>
            <div class="btn btn-sm btn-outline btn-primary book-detail-modal" title="detail" data-field="id" data-replace="data-id" >
                <span class="glyphicon glyphicon-eye-open "></span>
            </div>
            <div class="btn btn-sm btn-outline btn-success edit-book-modal" title="edit" data-field="id" data-replace="data-id">
                <span class="glyphicon glyphicon-pencil"></span>
            </div>
            <div class="btn btn-sm btn-outline btn-danger delete-modal" title="remove" data-field="id" data-replace="data-id">
                <span class="glyphicon glyphicon-remove"></span>
            </div>
        </td>
        </tr>`;

    var baseTableUrl = "http://localhost/foobla_books/index.php/book/filter?pg=:page:&lm=25&";
    var url = window.location.href;
    var pramaters = "";
    if (url.indexOf("?") > 0) {
        pramaters = url.substring(url.indexOf("?") + 1, url.length);
    }
    if (key_word) {
        $(".search_meta.result_hint").text(' for "' + key_word + '"');
    }
    var tableUrl = baseTableUrl + pramaters;
    var table = $("#books-table").ajaxTable({
        url: tableUrl,
        autoLoad: true,
        rowTemplate: rowTemplate
    });

    $.ajax({
        url: BASEURL + '/category/all',
        dataType: 'json',
        success: function (response) {
            data = response.data.map(function (el) {
                return {
                    id: el.id,
                    text: el.name
                }
            });
            $(".select2-category").select2({
                placeholder: "choose  categories",
                data: data,
                allowClear: true
            });
            $("#category_select").select2({
                placeholder: "all",
                data: data

            });
            if (category) {
                $("#category_select").val(category).trigger('change');
            }
        },
        error: function () {

        }
    });

    $.ajax({
        url: BASEURL + '/author/allName',
        dataType: 'json',
        success: function (response) {
            data = response.data.map(function (el) {
                return {
                    id: el.id,
                    text: el.full_name
                }
            });
            $("#author_select").select2({
                data: data
            });
            $(".select2-author").select2({
                placeholder: "choose  authors",
                data: data,
                allowClear: true
            });

            if (author) {
                $("#author_select").val(author).trigger('change');
            }
        },
        error: function () {

        }
    });

    $.ajax({
        url: BASEURL + '/book/allPublishedYear',
        dataType: 'json',
        success: function (response) {
            data = response.data.map(function (el) {
                return {
                    id: el.published_year,
                    text: el.published_year
                }
            });
            $("#published_select").select2({
                data: data
            });

            if (published) {
                $("#published_select").val(published).trigger('change');
            }
        },
        error: function () {

        }
    });

    function getQueryPramaters() {
        var query = "?";
        if (key_word) {
            query += "&k=" + key_word.replace(" ", "+");
        }
        if (category && category != 'any') {
            query += "&c=" + category;
        }
        if (author && author != 'any') {
            query += "&a=" + author;
        }
        if (published && published != 'any') {
            query += "&p=" + published;
        }
        if (query == '?') query = "";
        return query;
    }

    function renderBookDetail(data) {
        console.log(data);
        var modal = $("#book-detail-modal");
        modal.find('.book-name').text(data.name);
        modal.find('.book-published').text(data.published_year);

        var categoryList = modal.find('.categories_list');
        categoryList.empty();

        console.log(data.categories);
        for (var cate of data.categories) {
            var li = $('<li></li>');
            var a = $('<a href="#"></a>');
            a.attr('href', "http://localhost/foobla_books/index.php/book?c=" + cate.id);
            a.text(cate.name);

            li.append(a);
            categoryList.append(li);
        }

        var authorList = modal.find('.authors-list');
        authorList.empty();
        for (var auth of data.authors) {
            var li = $('<li></li>');
            var a = $('<a href="#"></a>');
            a.attr('href', "http://localhost/foobla_books/index.php/book?a=" + auth.id);
            a.text(auth.full_name);

            li.append(a);
            authorList.append(li);
        }
    }

    function renderBookEdit(data) {
        var modal = $("#edit-book-modal");

        var authors = data.authors.map(function (el) {
            return el.id;
        });

        var categories = data.categories.map(function (el) {
            return el.id;
        });
        var id = data.id;
        var name = data.name;
        var published = data.published_year;

        modal.find("input[name=id]").get(0).value = id;
        modal.find("input[name=name]").get(0).value = name;
        modal.find('input[name=published]').get(0).value = published;
        modal.find(".select2-category").select2('val', categories);
        modal.find(".select2-author").select2('val', authors);

    }

    function updateTable() {
        var query = getQueryPramaters();
        window.history.replaceState(null, null, "/foobla_books/index.php/book" + query);
        var url = window.location.href;
        var pramaters = "";
        if (url.indexOf("?") > 0) {
            pramaters = url.substring(url.indexOf("?") + 1, url.length);
        }
        if (key_word) {
            $(".search_meta.result_hint").text(' for "' + key_word + '"');
        }
        var tableUrl = baseTableUrl + pramaters;
        table.update({url: tableUrl});
    }

    $("#search-form").on("submit", function () {
        category = "any";
        author = "any";
        published = "any";
        key_word = $("#search_input").get(0).value;
        updateTable();
        return false;
    });

    $(".edit-book").on('click', function (e) {
        var id = $("#book_edit_form input[name=id]").val()
        var name = $("#book_edit_form input[name=name]").val();
        var publish = $("#book_edit_form input[name=published]").val();
        var categories = $("#book_edit_form .select2-category").val();
        var authors = $("#book_edit_form .select2-author").val();

        var form_data = new FormData();
        form_data.append('name', name);
        form_data.append('published_year', publish);
        form_data.append('categories', JSON.stringify(categories));
        form_data.append('authors', JSON.stringify(authors));

        var url = "http://localhost/foobla_books/index.php/book/update/" + id;
        $.ajax({
            url: url,
            type: "POST",
            processData: false,
            contentType: false,
            dataType: 'json',
            data: form_data,
            success: function (response) {
                var data = response.data;
                table.updateRow(data);
                $("#edit-book-modal").modal("hide");
            }
        })


    });

    $('body').on('click', ".book-detail-modal", function () {
        var id = $(this).attr('data-id');
        var url = "http://localhost/foobla_books/index.php/book/bookinfo/" + id;
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (response) {
                var data = response.data;
                renderBookDetail(data);
                $("#book-detail-modal").modal('show');
            }
        });
    });

    $('body').on('click', ".edit-book-modal", function () {
        var id = $(this).attr('data-id');
        var url = "http://localhost/foobla_books/index.php/book/bookinfo/" + id;
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (respnse) {
                var data = respnse.data;
                renderBookEdit(data);
                $("#edit-book-modal").modal('show');
            }
        });
    });

    $("#clear_filter").on('click', function (e) {
        $("#book_filers select").val("any").trigger('change');
    });

    $("#published_select").on('change', function () {
        published = $(this).val();
    });

    $("#author_select").on('change', function () {
        author = $(this).val();
    });

    $("#category_select").on('change', function () {
        category = $(this).val();
    });

    $('#book_filers').on('submit', function () {
        updateTable();
        return false;
    });

});