    /*
    ** namespace v0.1.0
    */
    (function(g) {
        var gazeta_pl = g.gazeta_pl || {};

        gazeta_pl.namespace = function(ns_string) {
            var
                parts = ns_string.split("."),
                parent = gazeta_pl,
                i;

            for (i = 0; i < parts.length; i += 1) {
                if ("undefined" === typeof parent[parts[i]]) {
                    parent[parts[i]] = {};
                }

                parent = parent[parts[i]];
            }

            return parent;
        };

        g.gazeta_pl = gazeta_pl;
    }(window));
