export default {
    generate(builder, project, config) {
        project.useProject('lib1_p')
        project.useProject('@user1/lib2_p')
        const exe1 = project.createTarget('exe1', 'EXECUTE')
        exe1.addSource('exe1.c')
        exe1.addDependency('lib1', 'lib2')
    }
}
