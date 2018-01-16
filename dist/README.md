# Grafana Peak Report

A peak report panel for [Grafana](http://grafana.org/).

![Peak Report Panel](https://raw.githubusercontent.com/BT-OpenSource/bt-grafana-peak-report/master/src/img/peak_report.png)

This panel shows a table that summarises multiple series into a report of peak values. Each row is formed by grouping series together using the first few components of the metric name. The cells for a row are calculated using some or all of its series, filtered by regex. The value for a cell is the maximum across all the series matching the column regex.

## Compatibility

This panel should work with the following data sources: [Graphite](https://grafana.net/plugins/graphite)

## Development

[Docker](https://www.docker.com/) is an easy way to spin-up an instance of Grafana. With docker installed, run the following command in the directory containing the plugin; this will expose the local plugin on your machine to the Grafana container so you can test it out.

    docker run -it -v $PWD:/var/lib/grafana/plugins/peak_report -p 3000:3000 --name grafana.docker grafana/grafana

Now do this...

    # Install development packages
    npm install

    # Install the grunt-cli
    sudo npm install -g grunt-cli

    # Compile into dist/
    grunt

    # Restart Grafana to see it
    docker restart grafana.docker

    # Watch for changes (requires refresh)
    grunt watch

Use `grunt test` to run the Jasmine tests for the plugin; and `grunt eslint` to check for style issues. Note that the plugin controller isn't tested because it depends on Grafana native libraries, which aren't available outside of Grafana.

## Contributing

For bugs and new features, open an issue and we'll take a look. If you want to contribute to the plugin, you're welcome to submit a pull request - just make sure `grunt` runs without errors first.
