<template>
    <section class="documents">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Documents à télécharger</h4>
                <p class="category">Vous trouverez sur cette page des modèles de documents à télécharger</p> <br>
            </div>
            <div class="card-content">
                <div class="row">
                    <div class="col-sm-12">
                        <el-table class="table-shopping"
                                  style="width: 100%"
                                  :data="productsTable">
                            <el-table-column width="120" label="">
                                <template slot-scope="props">
                                    <div class="img-container">
                                        <img :src="props.row.image" alt="">
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="160" label="Document">
                                <template slot-scope="props">
                                    <strong>{{props.row.title}}</strong>
                                    <p>{{props.row.subTitle}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    min-width="150"
                                    label="Téléchargement"
                                    class="td-number td-quantity">
                                <template slot-scope="props">
                                    <div class="btn-group">
                                        <a :href="$store.getters.apiUrl + '/downloads/'  + props.row.file" target="_blank" class="btn btn-success">Télécharger</a>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Vue from 'vue'
    import {Table, TableColumn} from 'element-ui'

    Vue.use(Table)
    Vue.use(TableColumn)
    export default {

        name: 'DocumentsIndexPage',
        data () {
            return {
                productsTable: [
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'AXA CG assurance grele-tempetes 2018.pdf',
                        title: 'AXA CG assurance grele-tempetes 2018',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'AXA CG assurance récolte commentée 2018.pdf',
                        title: 'AXA CG assurance récolte commentée 2018',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'SG Conditions Générales 2019.pdf',
                        title: 'SG Conditions Générales 2019',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Grêle-Tempête sur Récoltes - Déclaration d\'assolement campagne 2020.pdf',
                        title: 'Grêle-Tempête sur Récoltes - Déclaration d\'assolement campagne 2020',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Multirisque Récoltes Socle - Déclaration d\'assolement campagne 2020.pdf',
                        title: 'Multirisque Récoltes Socle - Déclaration d\'assolement campagne 2020',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Dossier d\'expertise 2020.pdf',
                        title: 'Dossier d\'expertise 2020',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Evaluation frais de re-semis - 2020 - V02.pdf',
                        title: 'Evaluation frais de re-semis - 2020 - V02',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Déclaration de re-semis 2020 - V02.pdf',
                        title: 'Déclaration de re-semis 2020 - V02',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'PV - Aléas climatiques - 2020 - V02.pdf',
                        title: 'PV - Aléas climatiques - 2020 - V02',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'PV - Grêle Gel Tempête - 2020 - V03.pdf',
                        title: 'PV - Grêle Gel Tempête - 2020 - V03',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Validation tempête 2020 - V02.pdf',
                        title: 'Validation tempête 2020 - V02',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Déclaration des quantités récoltées - 2020 - V02.pdf',
                        title: 'Déclaration des quantités récoltées - 2020 - V02',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Frais supplémentaires de récolte - 2020 - V02.pdf',
                        title: 'Frais supplémentaires de récolte - 2020 - V02',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Désistement - 2020 - V02.pdf',
                        title: 'Désistement - 2020 - V02',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Carnet de comptage - Aléas.pdf',
                        title: 'Carnet de comptage - Aléas',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Carnet de comptage - Colza.pdf',
                        title: 'Carnet de comptage - Colza',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Carnet de comptage - Céréales.pdf',
                        title: 'Carnet de comptage - Céréales',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Carnet de comptage - Général.pdf',
                        title: 'Carnet de comptage - Général',
                        subTitle: '',
                    },
                    {
                        image: 'static/documents/pdf-icon.png',
                        file: 'Carnet de comptage - Maïs.pdf',
                        title: 'Carnet de comptage - Maïs',
                        subTitle: '',
                    }
                ]
            }
        },
    }
</script>