# 目标操作系统

| CMAKE                  | 状态  |
|------------------------|-----|
| ANDROID                |     |
| APPLE                  |     |
| BSD                    |     |
| CYGWIN                 ||
| MSYS                   ||
| UNIX                   ||
| WIN32                  |     |
| WINCE                  ||
| WINDOWS_PHONE          ||
| WINDOWS_STORE          ||
| IOS                    ||
| LINUX                  ||
| MINGW                  ||
| CMAKE_SYSTEM           |     |
| CMAKE_SYSTEM_NAME      ||
| CMAKE_SYSTEM_PROCESSOR ||
| CMAKE_SYSTEM_VERSION   ||

# Node.js标准库

| CMAKE                       | Node.js       |
|-----------------------------|---------------|
| CMAKE_HOST_APPLE            | os.platform() |
| CMAKE_HOST_BSD              | os.platform() |
| CMAKE_HOST_LINUX            | os.platform() |
| CMAKE_HOST_SOLARIS          | os.platform() |
| CMAKE_HOST_SYSTEM           | os.release()  |
| CMAKE_HOST_SYSTEM_NAME      | os.release()  |
| CMAKE_HOST_SYSTEM_PROCESSOR | os.machine()  |
| CMAKE_HOST_SYSTEM_VERSION   | os.version()  |
| CMAKE_HOST_UNIX             | os.platform() |
| CMAKE_HOST_WIN32            | os.platform() |

# 等效替代

| CMAKE                            | 计算方式                 |
|----------------------------------|----------------------|
| BORLAND                          ||
| CMAKE_ANDROID_NDK_VERSION        ||
| CMAKE_CL_64                      ||
| CMAKE_COMPILER_2005              ||
| CMAKE_LIBRARY_ARCHITECTURE       ||
| CMAKE_LIBRARY_ARCHITECTURE_REGEX ||
| CMAKE_OBJECT_PATH_MAX            ||
| GHSMULTI                         ||
| MSVC                             | MSVC_VERSION > 0     |
| MSVC10                           | MSVC_VERSION >= 1600 |
| MSVC11                           | MSVC_VERSION >= 1700 |
| MSVC12                           | MSVC_VERSION >= 1800 |
| MSVC14                           | MSVC_VERSION >= 1900 |
| MSVC60                           | MSVC_VERSION >= 1200 |
| MSVC70                           | MSVC_VERSION >= 1300 |
| MSVC71                           | MSVC_VERSION >= 1310 |
| MSVC80                           | MSVC_VERSION >= 1400 |
| MSVC90                           | MSVC_VERSION >= 1500 |
| MSVC_IDE                         | MSVC_VERSION > 0     |
| MSVC_TOOLSET_VERSION             ||
| MSVC_VERSION                     ||
| XCODE                            ||
| XCODE_VERSION                    ||
