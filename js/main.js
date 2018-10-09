$.get('https://jsonplaceholder.typicode.com/posts', function(data){
    var html = ''

    data.forEach(element => {
        html += `   <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">${element.title}</div>
                            <div class="card-body">
                                <p class="card-text">${element.body}</p>
                                <button data-id="${element.id}" class="btn btn-primary details">Detalles</button>
                            </div>
                        </div>
        
                    </div> `
    });

    $('#post').append(html);

    var btnDetails = $('#post');
    var loader = $('#loader');
    var details = $('#details');

    btnDetails.delegate('.details','click',function(event){
        var html = '';
        details.html('')
        var id = $(this).data('id');
        loader.show();
        var urlgetDetails = 'https://jsonplaceholder.typicode.com/posts/' + id;
        var urlgetComments = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;


        $.get(urlgetDetails,function(data){
            loader.hide(500,function(){
                html = `<div class="col">
                            <div class="card">
                            <div class="card-header">${data.title}</div>
                            <div class="card-body">
                                <p class="card-text">${data.body}</p>
                            </div>
                        </div>
                        <span class="lead">Comments:</span>
                        <hr class="my-1">
                        <div id="comments">
                        </div>
                    </div>`
                   details.html(html) 

                   var comments = $('#comments')

                   $.get(urlgetComments,function(data){
                       data.forEach(el => {
                           comments.append(`
                                <span class="badge badge-info">${el.email}</span>
                                <span class="lead">${el.body}</span>
                                <hr class="my-1">
                           `)
                       })
                   })
            });
        })

    })


})