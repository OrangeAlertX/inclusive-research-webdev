Есть две версии компоновки этого объединенного проекта.

Первый это docker-compose + nginx для статических фаилов.

Второй - это GitHub Actions. После слияния development ветки с main, он предпринимает попытку скомпилировать это и обновить production, который отображается в github pages. При этом теряется возможность использовать бэкенд, зато, в отличии от контейнеров, это бесплатно. И в данном случае целесообразно.
