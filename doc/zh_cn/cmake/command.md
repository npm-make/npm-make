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
| site_name              | os.hostname()        |

# npm-make函数

| CMAKE                      | NPM-MAKE              |
|----------------------------|-----------------------|
| add_compile_definitions    | addCompileDefinitions |
| add_compile_options        | addCompileOptions     |
| add_dependencies           | addDependencies       |
| add_executable             | addExecutable         |
| add_library                | addLibrary            |
| add_link_options           | addLinkOptions        |
| include_directories        | addIncludeDirectories |
| link_directories           | addLinkDirectories    |
| link_libraries             | addLinkLibraries      |
| target_compile_definitions | addCompileDefinitions |
| target_compile_features    | addCompileFeatures    |
| target_compile_options     | addCompileOptions     |
| target_include_directories | addIncludeDirectories |
| target_link_directories    | addLinkDirectories    |
| target_link_libraries      | addLinkLibraries      |
| target_link_options        | addLinkOptions        |
| target_precompile_headers  | addPrecompileHeaders  |
| target_sources             | addSources            |

# 不受支持

| CMAKE                         | 原因                 |
|-------------------------------|--------------------|
| add_test                      | 未来支持               |
| add_custom_command            | 未来支持               |
| add_custom_target             | 未来支持               |
| cmake_host_system_information | 未来支持               |
| cmake_minimum_required        | 未来支持               |
| cmake_policy                  | 未来支持               |
| create_test_sourcelist        | 未来支持               |
| ctest_build                   | 未来支持               |
| ctest_configure               | 未来支持               |
| ctest_coverage                | 未来支持               |
| ctest_empty_binary_directory  | 未来支持               |
| ctest_memcheck                | 未来支持               |
| ctest_read_custom_files       | 未来支持               |
| ctest_run_script              | 未来支持               |
| ctest_sleep                   | 未来支持               |
| ctest_start                   | 未来支持               |
| ctest_submit                  | 未来支持               |
| ctest_test                    | 未来支持               |
| ctest_update                  | 未来支持               |
| ctest_upload                  | 未来支持               |
| define_property               | 未来支持               |
| enable_testing                | 未来支持               |
| export                        | 未来支持               |
| get_cmake_property            | 未来支持               |
| get_directory_property        | 未来支持               |
| get_property                  | 未来支持               |
| get_source_file_property      | 未来支持               |
| get_target_property           | 未来支持               |
| get_test_property             | 未来支持               |
| set_directory_properties      | 未来支持               |
| set_property                  | 未来支持               |
| set_source_files_properties   | 未来支持               |
| set_target_properties         | 未来支持               |
| set_tests_properties          | 未来支持               |
| source_group                  | 未来支持               |
| add_subdirectory              | npm_make使用另外的形式实现它 |
| aux_source_directory          | npm_make使用另外的形式实现它 |
| build_command                 | npm_make使用另外的形式实现它 |
| configure_file                | npm_make使用另外的形式实现它 |
| enable_language               | npm_make使用另外的形式实现它 |
| fltk_wrap_ui                  | npm_make使用另外的形式实现它 |
| install                       | npm_make使用另外的形式实现它 |
| mark_as_advanced              | npm_make使用另外的形式实现它 |
| option                        | npm_make使用另外的形式实现它 |
| project                       | npm_make使用另外的形式实现它 |
| separate_arguments            | npm_make使用另外的形式实现它 |
| try_compile                   | npm_make使用另外的形式实现它 |
| try_run                       | npm_make使用另外的形式实现它 |
| cmake_language                | 在JavaScript中没有意义   |
| cmake_parse_arguments         | 在JavaScript中没有意义   |
| add_definitions               | 不建议使用              |
| find_file                     | 不建议使用              |
| find_library                  | 不建议使用              |
| find_package                  | 不建议使用              |
| find_path                     | 不建议使用              |
| find_program                  | 不建议使用              |
| include_external_msproject    | 不建议使用              |
| include_regular_expression    | 不建议使用              |
| load_cache                    | 不建议使用              |
| remove_definitions            | 不建议使用              |
| build_name                    | 过时的                |
| exec_program                  | 过时的                |
| export_library_dependencies   | 过时的                |
| install_files                 | 过时的                |
| install_programs              | 过时的                |
| install_targets               | 过时的                |
| load_command                  | 过时的                |
| make_directory                | 过时的                |
| output_required_files         | 过时的                |
| qt_wrap_cpp                   | 过时的                |
| qt_wrap_ui                    | 过时的                |
| remove                        | 过时的                |
| subdir_depends                | 过时的                |
| subdirs                       | 过时的                |
| use_mangled_mesa              | 过时的                |
| utility_source                | 过时的                |
| variable_requires             | 过时的                |
| write_file                    | 过时的                |
