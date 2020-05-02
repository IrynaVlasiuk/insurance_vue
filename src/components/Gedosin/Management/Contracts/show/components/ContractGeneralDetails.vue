/* eslint-disable */
<template>

        <div class="claim-show-page">
            <div class="card">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <h5>Détails du contrat</h5>
                        <hr>
                    </div>

                    <div class="card-content">
                        <div class="col-lg-6">
                            <p>Offre : <b>{{contract.offer}}</b></p>
                            <p>Produit : {{contract.product}}</p>
                            <p v-if="contract.deductible_hazards_option">Franchise aleas : {{contract.deductible_hazards_option}}</p>
                            <p v-if="contract.deductible_hail_option">Franchise grêle : {{contract.deductible_hail_option}}</p>
                        </div>
                        <div class="col-lg-6">
                            <p></p>
                            <p></p>
                            <p v-if="contract.offer=='GRELE'">Gel : {{contract.option1 === "ja" ? "OUI" : "NON"}}</p>
                            <p v-else>Frais de resemis : {{contract.option1 === "ja" ? "OUI" : "NON"}}</p>
                            <p v-if="contract.offer=='GRELE'">Qualité : {{contract.option2 === "ja" ? "OUI" : "NON"}}</p>
                            <p v-else>Frais de récolte supplémentaires : {{contract.option2 === "ja" ? "OUI" : "NON"}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row contract-information" v-if="contract">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h5>Client</h5>
                        <hr>
                    </div>
                    <div class="card-content">
                        <p><b>{{customer.full_name}}</b></p>
                        <p>{{customer.address1}}</p>
                        <p>{{customer.address2}}</p>
                        <p>{{customer.zipcode}} {{customer.city}}</p>
                        <br>
                        <p>Telephone: {{customer.landline}}</p>
                        <p>Portable: {{customer.mobile}}</p>
                        <p>Fax: {{customer.fax}}</p>
                        <p>Email: {{customer.email}}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h5>Agent</h5>
                        <hr>
                    </div>
                    <div class="card-content">
                        <p><b>{{agent.full_name}}</b></p>
                        <p>{{agent.address1}}</p>
                        <p>{{agent.address2}}</p>
                        <p>{{agent.zipcode}} {{agent.city}}</p>
                        <br>
                        <p>Telephone: {{agent.landline}}</p>
                        <p>Portable: {{agent.mobile}}</p>
                        <p>Fax: {{agent.fax}}</p>
                        <p>Email: {{agent.email}}</p>
                    </div>
                </div>
            </div>
        </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h5>Clauses</h5>
                                <hr>
                            </div>
                            <div class="card-content">
                                <div class="col-lg-12">
                                    <p>{{contract.clauses}}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

        <div class="row" v-if="contract.claims[0]">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <label>Positions du contrat</label>
                    </div>
                    <div class="card-content">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Nom de la parcelle</th>
                                <th>Culture</th>
                                <th>Variété</th>
                                <th>Superficie</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="claimPlot in realPlots">
                                <td>{{claimPlot.plot_name}}</td>
                                <td>{{claimPlot.crop_name}} <small>({{claimPlot.crop_code}})</small></td>
                                <td>{{claimPlot.crop_variety}}</td>
                                <td>{{claimPlot.plot_surface}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

            </div>
        </div>
</template>

<script>
  export default {
    name: 'ContractGeneralDetails',
    computed: {
      /** Computed Contract **/
      contract: function () {
        return this.$parent.contract
      },
      /** Computed Customer **/
      customer: function () {
        return this.contract.customer ? this.contract.customer : {}
      },
      /** Computed Agent **/
      agent: function () {
        return this.contract.agent ? this.contract.agent : {}
      },
        realPlots: function() {
            return this.contract.claims[0].claim_plots.filter(function(p) {
                return p.plot_number!=0;
            });
        }
    }
  }
</script>
