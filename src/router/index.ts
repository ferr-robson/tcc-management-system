import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/alunos',
    component: () => import('../views/Alunos.vue')
  },
  {
    path: '/professores',
    component: () => import('../views/Professores.vue')
  },
  {
    path: '/cursos',
    component: () => import('../views/Cursos.vue')
  },
  {
    path: '/departamentos',
    component: () => import('../views/Departamentos.vue')
  },
  {
    path: '/unidades-academicas',
    component: () => import('../views/UnidadesAcademicas.vue')
  },
  {
    path: '/tccs',
    component: () => import('../views/TCCs.vue')
  },
  {
    path: '/tcc/create',
    component: () => import('../views/tccs/Create.vue'),
    meta: { hideHeader: true }
  },
  {
    path: '/tcc/edit/:id',
    component: () => import('../views/tccs/Edit.vue'),
    meta: { hideHeader: true }
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
