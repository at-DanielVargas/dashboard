import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';
import { filter, map, startWith, tap } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'goc-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || event instanceof RouterEvent
        ),
        startWith(''),
        map(() => this.buildBreadcrumbs(this.activatedRoute.root))
      )
      .subscribe((breadcrumbs) => {
        this.breadcrumbs = breadcrumbs;
      });
  }

  buildBreadcrumbs(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';

    if (route.routeConfig && route.routeConfig.data) {
      console.log(route.routeConfig.data)
      console.log(route.firstChild)
    }

    if (label) {
      const path = route.routeConfig ? route.routeConfig.path : '';

      const nextUrl = `${url}/${path}`;

      const breadcrumb: Breadcrumb = {
        label,
        url: nextUrl,
      };
      breadcrumbs.push(breadcrumb);
    }

    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
