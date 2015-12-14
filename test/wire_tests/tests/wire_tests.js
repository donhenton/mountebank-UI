describe('wire_tests.js', function () {
    var data = JSON3.stringify(simpleTest);
    /*
     beforeAll(function (done)
     {
     $.ajax({
     type: "POST",
     url: "http://localhost:2525/imposters",
     data: data,
     error: error,
     complete: complete,
     success: success
     });
     function error(err)
     {
     console.log("errorin beforeAll " + JSON3.stringify(err));
     done();
     }
     function success(data)
     {
     //console.log(JSON3.stringify(data));
     done();
     }
     function complete()
     {
     done();
     }
     }, 5000);
     
     
     afterAll(function (done)
     {
     //simpleTest is in wire_tests/data/imposter_data.js
     var data = JSON3.stringify(simpleTest);
     $.ajax({
     type: "DELETE",
     url: "http://localhost:2525/imposters/7777",
     error: error,
     complete: complete,
     success: success
     });
     function error(err)
     {
     console.log("error in afterAll " + JSON3.stringify(err));
     }
     function success(data)
     {
     // console.log("delete success " + JSON3.stringify(data));
     done();
     }
     function complete()
     {
     // console.log("delete complete")
     done();
     }
     
     
     
     
     }, 5000);
    

    it('testTalkingToMb', function (done)
    {
 
        var data = JSON3.stringify({"alpha": 25});
        $.post("http://localhost:7777/test",data,function (data) {




        },'json').done(function (data) {
            alert("second success "+ JSON3.stringify(data));
        })
                .fail(function (err) {
                    console.log("error in test " + JSON3.stringify(err));
                    done.fail();
                })
                .always(function () {
                    done();
                });



    }, 5000);
     */
    
    
    
    it('testTalkingToMb', function (done)
    {
        $.ajax({
            type: "POST",
            url: "http://localhost:7777/decorate",
            data: JSON3.stringify({alpha: 25}),
//            headers: {
//                'Access-Control-Allow-Origin': '*',
//                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
//
//
//            },
            contentType: 'application/json',
            crossOrigin: true,
            error: error,
            complete: complete,
            success: success
        });
        function error(err)
        {
            console.log("error in test " + JSON3.stringify(err));
            done.fail();
        }
        function success(data)
        {
            expect(data).toEqual({'alpha': 25})
            done();
        }
        function complete()
        {
            done();
        }
    }, 5000);
    
    
});