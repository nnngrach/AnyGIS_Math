import * as shell from "shelljs";

shell.cp("-R", "src/assets/js/lib", "dist/assets/js/");
shell.cp("-R", "src/assets/fonts", "dist/assets/");
shell.cp("-R", "src/assets/images", "dist/assets/");
