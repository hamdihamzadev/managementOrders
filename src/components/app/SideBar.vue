<template>
    <div class="aside fixed-top" >
      <div class="nav-aside">
        <div class="logobrand ">
          <img src="https://demo.plainadmin.com/assets/images/logo/logo-white.svg" alt="">
        </div>
        <div class="links ">
          <ul >
            <router-link to="/" tag="li"><a href="" class="dashbord"><i class='bx bxs-pie-chart-alt'></i>Dashbord</a></router-link>
  
            <li>
  
              <a  href="#" @click="chnageicon" v-b-toggle.collapse-3>
                <i class='bx bxs-shopping-bag-alt'></i>Orders<i class='bx bxs-chevron-up' id="iDrop"></i>
              </a>
  
              <b-collapse id="collapse-3" class="mt-3 mb-3">
                <router-link to="/Orders/NewOrders" tag="li"><a href="" class="linkdrop">New Orders</a></router-link>
                <router-link to="/Orders/Confirmed" tag="li"><a href="" class="linkdrop">Confirmed</a></router-link>
                <router-link to="/Orders/Shipped" tag="li"><a href="" class="linkdrop">Shipped</a></router-link>
                <router-link to="/Orders/Deliverd" tag="li"><a href="" class="linkdrop">Deliverd</a></router-link>
                <router-link to="/Orders/PostPond" tag="li"><a href="" class="linkdrop">Postpond</a></router-link>
                <router-link to="/Orders/Return" tag="li"><a href="" class="linkdrop">Return</a></router-link>
                <router-link to="/Orders/Canceld" tag="li"><a href="" class="linkdrop">Canceld</a></router-link>
                <router-link to="/Orders/InProgress" tag="li"><a href="" class="linkdrop">In Progress</a></router-link>
              </b-collapse>
            </li>
  
            <router-link to="/" tag="li"><a href=""><i class='bx bxs-doughnut-chart'></i>Stock</a></router-link>
            <router-link to="/" tag="li"><a href=""><i class='bx bxs-bar-chart-alt-2'></i>Statistical</a></router-link>
            <router-link to="/" tag="li"><a href=""><i class='bx bxs-dollar-circle'></i>Profitability</a></router-link>
            <router-link to="/" tag="li"><a href=""><i class='bx bxs-message-rounded-dots'></i>Contact</a></router-link>
            <router-link to="/TableBoot" tag="li"><a href=""><i class='bx bxs-message-rounded-dots'></i>table</a></router-link>
            <router-link to="/LoginUser" tag="li"><a href=""><i class='bx bxs-message-rounded-dots'></i>LoginUser</a></router-link>
            <router-link to="/test" tag="li"><a href=""><i class='bx bxs-message-rounded-dots'></i>test</a></router-link>
          </ul>
        </div>
      </div>
  
    </div>
  </template>
  
  
  <script>
    
    export default {
  
      name: 'SideBar',
      props: ['visibleSide'],
  
      mounted() {
  
        // initial active to dashbord
        let dashbord=document.querySelector('.dashbord')
        dashbord.classList.add('active')
         // get all link
        let allLinks = document.querySelectorAll('a');
        allLinks.forEach(link=>{
          link.addEventListener('click',()=>{
            // remove active in all element
            allLinks.forEach(a=>{
              a.classList.remove('active')
            })
            // add active in element clicked
            link.classList.add('active')
          })
        })
    
      }
  
    }
  
  </script>
  
  <style lang="scss">
    .aside {
      background: var(--couleur-primaire-1);
      width: 14%;
      height: 100vh;
      transition: 0.3s;
  
      .nav-aside {
        margin-top: 30px;
  
        .logobrand {
          margin-bottom: 96px;
          padding: 0px 25px;
        }
  
        .links ul {
          list-style: none;
          padding-left: 1rem;
  
          li {
            margin-bottom: 11px;
            padding: 0px 25px;
  
            a {
              text-decoration: none;
              color: var(--couleur-primaire-2);
              text-wrap: nowrap;
              display: block;
  
              .bx {
                margin-right: 13px;
              }
  
              #iDrop {
                float: right;
                margin-top: 6px;
              }
  
            }
  
            a:hover ,.active {
              color: var(--couleur-primaire-3);
            }
  
            a:hover .bx , .active .bx {
              color: var(--couleur-primaire-4);
            }
  
            a:hover #iDrop , .active #iDrop{
              color: var(--couleur-primaire-3);
            }
  
          }
  
        }
      }
    }
  
    #invisibleside {
      display: none;
    }
  
    #visible {
      display: block;
    }
  
    .linkdrop {
      font-size: 13px;
    }


  </style>