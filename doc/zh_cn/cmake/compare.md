# JavaScript语言结构

| CMAKE         | JavaScript     |
|---------------|----------------|
| block         | （变量作用域）        |
| break         | break          |
| continue      | continue       |
| else          | if ... else    |
| elseif        | if ... else if |
| endblock      | （变量作用域）        |
| endforeach    | for ... of     |
| endfunction   | function       |
| endif         | if             |
| endmacro      | function       |
| endwhile      | while          |
| foreach       | for ... of     |
| function      | function       |
| if            | if             |
| include       | （模块）           |
| include_guard | （模块）           |
| macro         | function       |
| return        | return         |
| set           | （变量）           |
| unset         | delete         |
| while         | while          |

# JavaScript标准库

| CMAKE          | JavaScript            |
|----------------|-----------------------|
| list           | Array                 |
| math           | Math                  |
| message        | console.log           |
| string         | String                |
| variable_watch | Object.defineProperty |

# Node.js标准库

| CMAKE                  | Node.js              |
|------------------------|----------------------|
| cmake_path             | path                 |
| execute_process        | child_process.exec() |
| get_filename_component | fs.realpath()        |
| file                   | fs                   |
| separate_arguments     | process.argv         |
| site_name              | os.hostname()        |

# npm-make环境变量

| CMAKE                         | NPM-MAKE |
|-------------------------------|----------|
| cmake_host_system_information ||
| cmake_minimum_required        ||
| get_cmake_property            ||

# npm-make函数

| CMAKE                       | NPM-MAKE |
|-----------------------------|----------|
| add_compile_definitions     ||
| add_compile_options         ||
| add_custom_command          ||
| add_custom_target           ||
| add_definitions             ||
| add_dependencies            ||
| add_executable              ||
| add_library                 ||
| add_link_options            ||
| add_subdirectory            ||
| add_test                    ||
| aux_source_directory        ||
| build_command               ||
| create_test_sourcelist      ||
| define_property             ||
| enable_language             ||
| enable_testing              ||
| export                      ||
| fltk_wrap_ui                ||
| get_source_file_property    ||
| get_target_property         ||
| get_test_property           ||
| include_directories         ||
| include_external_msproject  ||
| include_regular_expression  ||
| install                     ||
| link_directories            ||
| link_libraries              ||
| load_cache                  ||
| project                     ||
| remove_definitions          ||
| set_source_files_properties ||
| set_target_properties       ||
| set_tests_properties        ||
| source_group                ||
| target_compile_definitions  ||
| target_compile_features     ||
| target_compile_options      ||
| target_include_directories  ||
| target_link_directories     ||
| target_link_libraries       ||
| target_link_options         ||
| target_precompile_headers   ||
| target_sources              ||
| try_compile                 ||
| try_run                     ||

# 不受支持

| CMAKE                        | 原因                      |
|------------------------------|-------------------------|
| ctest_build                  | 暂不支持测试                  |
| ctest_configure              | 暂不支持测试                  |
| ctest_coverage               | 暂不支持测试                  |
| ctest_empty_binary_directory | 暂不支持测试                  |
| ctest_memcheck               | 暂不支持测试                  |
| ctest_read_custom_files      | 暂不支持测试                  |
| ctest_run_script             | 暂不支持测试                  |
| ctest_sleep                  | 暂不支持测试                  |
| ctest_start                  | 暂不支持测试                  |
| ctest_submit                 | 暂不支持测试                  |
| ctest_test                   | 暂不支持测试                  |
| ctest_update                 | 暂不支持测试                  |
| ctest_upload                 | 暂不支持测试                  |
| find_file                    | 引用npm包                  |
| find_library                 | 引用npm包                  |
| find_package                 | 引用npm包                  |
| find_path                    | 引用npm包                  |
| find_program                 | 引用npm包                  |
| configure_file               | npm_make具有与cmake不同的项目结构 |
| mark_as_advanced             | npm_make具有与cmake不同的项目结构 |
| option                       | npm_make具有与cmake不同的项目结构 |
| get_directory_property       | npm_make具有与cmake不同的项目结构 |
| get_property                 | npm_make具有与cmake不同的项目结构 |
| set_directory_properties     | npm_make具有与cmake不同的项目结构 |
| set_property                 | npm_make具有与cmake不同的项目结构 |
| cmake_language               | 在JavaScript中没有意义        |
| cmake_parse_arguments        | 在JavaScript中没有意义        |
| cmake_policy                 | 在JavaScript中没有意义        |
| build_name                   | 过时的                     |
| exec_program                 | 过时的                     |
| export_library_dependencies  | 过时的                     |
| install_files                | 过时的                     |
| install_programs             | 过时的                     |
| install_targets              | 过时的                     |
| load_command                 | 过时的                     |
| make_directory               | 过时的                     |
| output_required_files        | 过时的                     |
| qt_wrap_cpp                  | 过时的                     |
| qt_wrap_ui                   | 过时的                     |
| remove                       | 过时的                     |
| subdir_depends               | 过时的                     |
| subdirs                      | 过时的                     |
| use_mangled_mesa             | 过时的                     |
| utility_source               | 过时的                     |
| variable_requires            | 过时的                     |
| write_file                   | 过时的                     |
