!function(lo) {
  _.each($('.movie_box'), __(
    _.c(movies),
    _.t$(`
      .header
        .title 
          h3 한국 영화 무비 박스
        .filter
          .rating
            label 등급 
            .inputs {{_.go($, _.map(m => m.rating), _.uniq, _.sum(`, _.t$(`
              input[type=checkbox name=rating value='{{$}}'] {{$}}
            `) ,`))}}
          .genre
            label 장르 
            .inputs {{_.go($, _.map(m => m.genre), _.uniq, _.sum(`, _.t$(`
              input[type=checkbox name=genre value='{{$}}'] {{$}}
            `) ,`))}}
          .director
            label 감독 
            .inputs {{_.go($, _.map(m => m.director), _.uniq, _.sum(`, _.t$(`
              input[type=checkbox name=director value='{{$}}'] {{$}}
            `) ,`))}}
        .sort
          label 정렬
          select
            option[value=name] 이름
            option[value=attendance] 관객수
            option[value=comment] 댓글
            option[value=like] 좋아요
      .body
        ul.movie_list {{_.go($, `, lo.items = _.sum(_.t$(`
          li.movie_item {{$.name}} | {{$.date}} | {{$.director}} | {{$.genre}} | {{$.rating}} [ {{$.attendance}} | {{$.like}} | {{$.comment}} ]
        `)) ,`)}}
        .extension
          .btns
            button.btn1 가장 개봉한 영화가 가장 많았던 해의 총 관람객 수
            button.btn2 2000년대 개봉한 영화 중 가장 관객수가 적은 영화
            button.btn3 12세 이상 관람가 중에서 김기덕 감독의 영화가 아닌 영화 다섯편
    `),
    D.prepend_to('.movie_box'),


    _.c('.movie_box'), D,
    D.on('change', '.filter input[type=checkbox]', __(
      _.always("input:checked"), D,
      _.reduce((result, c) => {
        result[c.name] ? result[c.name].push(c.value) : result[c.name] = [c.value];
        return result;
      }, {}),
      lo.movie_filter = _.memoize(checked_map => {
        return _.filter(movies, m => {
          return _.every(_.map(checked_map, (arr, key) => _.contains(arr, m[key])))
        })
      },
      checked_map => {
        return _.reduce(checked_map, (str, arr, key) => str + arr.join() + key, '');
      }),
      data => lo.current_list = data,
      lo.items,
      D.html_to('.movie_list'))),

    D.on('change', '.sort select', __(
      e => _.sort_by(lo.current_list || movies, e.$currentTarget.value),
      lo.items,
      D.html_to('.movie_list'))),

    D.on('click', '.extension .btn1', __(
      function(e) {
        // - 가장 개봉한 영화가 많았던 해의 총 관람객 수
        let data = lo.current_list || movies;

        return _.go(
          data,
          _.group_by(function(v){
            return v.date.slice(0, 4)
          }),
          _.max('length'),
          _.reduce(function(m, v){
            return m + v.attendance;
          }, 0)
        )

      }, _.log)),

    D.on('click', '.extension .btn2', __(
      function(e) {
        // - 2000년대 개봉한 영화 중 가장 관객수가 적은 영화
        let data = lo.current_list || movies;

        return _.go(

          data,
          // _.group_by(function(value){
          //   const year = value.date.slice(0,2);
          //   return year == 20;
          // }),_.hi,
          // _.sort_by(function(a, b){ //의문: 왜 sorting이 년도별로 잘려서 될까?
          //   return a.attendance > b.attendance ? 1 : -1;
          // }),_.hi,
          // _.min(),_.hi

          _.filter(function(movie){
            if(movie.date.slice(0,2) == 20) {
              return movie;
            }
          }),_.hi,
          _.sort_by(function(a, b){ //의문: 왜 sorting이 년도별로 잘려서 될까?
            return a.attendance > b.attendance ? 1 : -1;
          }),_.hi

        )

      }, _.log)),

    D.on('click', '.extension .btn3', __(
      function(e) {
        // - 12세 이상 관람가 중에서 김기덕 감독의 영화가 아닌 영화 다섯편
        let data = lo.current_list || movies;

        return _.go(

          // data,
          // _.filter(function(movie){
          //   return movie.rating == '12세 이상 관람가';
          // }),_.hi,
          // _.reject(function(movie){
          //   return movie.director == '김기덕';
          // }),_.hi,
          // _.sort_by(function(a, b){
          //   return a.attendance > b.attendance ? 1 : -1;
          // }),_.hi,
          // _.first((5)),_.hi

          data,
          _.filter((movie) => movie.rating == '12세 이상 관람가'),_.hi,
          _.reject((movie) => movie.director == '김기덕'),_.hi,
          _.sort_by((a, b) => a.attendance > b.attendance ? 1 : -1),_.hi,
          _.first((5)),_.hi

        )


      }, _.log))
  ))

}({});
