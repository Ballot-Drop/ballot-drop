<template>
  <b-table
    :items="locations"
    :fields="fields"
    :filter="filter"
    :filter-included-fields="filterOn"
    empty-text="Ballot drop off locations coming soon!"
    empty-filtered-text="No locations match that search term"
    hover
    responsive="sm"
    show-empty
    small
    striped
    text-left
  >
    <!-- show the empty-text if no locatiions -->
    <template v-slot:empty="scope">
      <h4 class="text-center">{{ scope.emptyText }}</h4>
    </template>

    <!-- show the empty-filtered-text if no locatiions match the search term-->
    <template v-slot:emptyfiltered="scope">
      <h4 class="text-center">{{ scope.emptyFilteredText }}</h4>
    </template>

    <!-- display the table when it has location data -->
    <template v-slot:row-details="row">
      <b-card>
        <ul>
          <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
        </ul>
      </b-card>
    </template>

    <template #cell(Name)="data">
      {{ titleCase(data.item.Name) }}
    </template>
    <template #cell(City)="data">
      {{ titleCase(data.item.City) }}
    </template>
    <template #cell(Address)="data">
      {{ titleCase(data.item.Address) }}
    </template>
  </b-table>
</template>

<script>

export default {
  name: 'DropBoxContainer',
  props: {
    filter: String,
    locations: Array,
  },
  data: function() {
    return {
      filterOn: ["City"],
      fields: [
        {
          key: 'City',
          label: 'City',
          filterByFormatted: true,
        },
        { key: 'Name', label: 'Location Name' },
        { key: 'Address', label: 'Address' },
        { key: 'Zip', label: 'Zip' },
        { key: 'Hours', label: 'Hours' },
      ],
    }
  },
  methods: {
    titleCase(str) {
      if (str) {
        return str.toLowerCase().split(' ').map(function(word) {
          return word.replace(word[0], word[0].toUpperCase());
            }).join(' ');
      }
    }
  }
}
</script>

<style scoped>

</style>
