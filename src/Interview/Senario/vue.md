# Vue

## How could vue router linking an external website

```js
{
  path: '/a',
  beforeEnter(to, from next) {
    window.location = "http://example.com"
  }
}
```

```js
import Vue from 'vue';
import Router from 'vue-router';
import ProjectsList from './views/ProjectsList.vue';

Vue.use(Router);

const radarQueryParams = {
  component: 'Okapi',
  version: 'Support',
  classificaiton: 'Other Bug',
  title: 'Okapi issue',
  description: `What is your org?

  What is your team?

  Do you have an issue with a specific test, project or segment? (specify name)

  Describe your issue.

  Step to reproduce:

  Describe expected behavior.
  `,
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "logout" */ './views/logout.vue'),
    },
    {
      path: '/document',
      name: 'document',
      beforeEnter() {location.href = 'https://pages.github.pie.apple.com/Okapi/okapi-docs'},
    },
    {
      path: '/report',
      name: 'report',
      beforeEnter() {location.href = encodeURI(`rdar://new/problem/${Object.keys(radarQueryParams).map(((key, index) => `${index === 0 ? '' : '&'}${key}=${radarQueryParams[key]}`)).join('')}`)},
    },
    {
      path: '/',
      name: 'projects',
      component: ProjectsList,
    },
    {
      path: '/project/:projectSlug',
      name: 'project',
      component: () => import(/* webpackChunkName: "project-detail" */ './views/ProjectDetail.vue'),
      redirect: to => {
        if (to.params && to.params.projectSlug && to.params.projectSlug === 'new') return '/project/new/settings';
        return `/project/${to.params.projectSlug}/tests`;
      },
      children: [
        {
          path: 'settings',
          name: 'project-settings',
          component: () => import(/* webpackChunkName: "project-settings" */ './views/ProjectSettings.vue'),
        },
        {
          path: 'clone',
          name: 'clone-project',
          component: () => import(/* webpackChunkName: "project-settings" */ './views/ProjectSettings.vue'),
        },
        {
          path: 'audiences',
          name: 'audiences',
          component: () => import(/* webpackChunkName: "project-audiences" */ './views/AudiencesList.vue'),
        },
        {
          path: 'audience/:audienceSlug',
          name: 'audience',
          component: () => import(/* webpackChunkName: "project-audience" */ './views/Audience.vue'),
          children: [
            {
              path: 'clone',
              name: 'clone-audience',
            },
          ],
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ './views/404.vue'),
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: () => import(/* webpackChunkName: "forbidden" */ './views/404.vue'),
    },
  ],
});

export default router;
```