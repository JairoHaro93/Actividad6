        CREACION DE SERVICIO E INTERFAZ USUARIOS
        ng g i interfaces/IUsuaio --type=interface
        ng g s services/usuarios --skip-tests


        CREACION DE COMPONENTES

        '/'
        ng g c components/navbar



        CREACION DE PAGES

        ng g c pages/home
        ng g c pages/newuser


        RUTAS
         '/' redirectTo a home.
         '/home' =>componente Home
         '/usuarios' =>
