<template>
    <div class="card card-user">
        <div class="image">
            <img src="static/img/background/background-5.jpg" alt="...">
        </div>
        <div class="card-content">
            <div class="author">
                <img class="avatar border-white" src="static/img/userpic.png" alt="...">
                <h4 class="title">{{$parent.user.full_name}}
                    <br>
                    <a href="#">
                        <small>{{ $t('user_types.' + $parent.user.type.name)}}</small>
                    </a>
                </h4>
                <div class="col-md-8 el-col-md-offset-4 area">
                  {{ AreaName }}
                </div>


            </div>
            <!--<p class="description text-center">-->
            <!--"I like the way you work it-->
            <!--<br> No diggity-->
            <!--<br> I wanna bag it up"-->
            <!--</p>-->
        </div>
        <hr>
        <div class="text-center">
            <div class="row">
                <!-- -->
            </div>
        </div>
    </div>
</template>
<script>

   export default {
  //   data () {
  //     return {
  //       details: [
  //         {
  //           title: '6',
  //           subTitle: 'Claim Assigned'
  //         },
  //         {
  //           title: '2',
  //           subTitle: 'Claims resolved'
  //         },
  //         {
  //           title: '3',
  //           subTitle: 'Surveys involved'
  //         },
  //         {
  //           title: '15',
  //           subTitle: 'Surveys resolved'
  //         }
  //       ]
  //     }
  //   },
  //   methods: {
  //     getClasses (index) {
  //       const remainder = index % 3
  //       if (remainder === 0) {
  //         return 'col-md-3 col-md-offset-1'
  //       } else if (remainder === 2) {
  //         return 'col-md-4'
  //       } else {
  //         return 'col-md-3'
  //       }
  //     }
  //   }
     computed: {
       AreaName: function () {
         return  this.$parent.user.area ? this.$parent.user.area.name : ''
        }
     }
   }

</script>
<style>
  .area {
    text-align: center;
  }
</style>
