import React from 'react';
import Base from '../components/base';
import Filter from '../components/filter';
import {MetadataHeaders, MetadataColumns, TableBody} from '../components/listViewHelpers';
import api from '../services/api';
import test from '../utils/filterHelper';
import Sorter, {defaultSortInfo} from '../components/sorter';

export default class StorageClasses extends Base {
    state = {
        filter: '',
        sort: defaultSortInfo(this),
    };

    componentDidMount() {
        this.registerApi({
            items: api.storageClass.list(items => this.setState({items})),
        });
    }

    render() {
        const {items, sort, filter} = this.state;
        const filtered = items && items.filter(x => test(filter, x.metadata.name));

        return (
            <div id='content'>
                <Filter
                    text='Storage Classes'
                    filter={filter}
                    onChange={x => this.setState({filter: x})}
                />

                <div className='contentPanel'>
                    <table>
                        <thead>
                            <tr>
                                <MetadataHeaders sort={sort} />
                                <th><Sorter field='reclaimPolicy' sort={sort}>Reclaim Policy</Sorter></th>
                                <th><Sorter field='volumeBindingMode' sort={sort}>Mode</Sorter></th>
                            </tr>
                        </thead>

                        <TableBody items={filtered} filter={filter} sort={sort} colSpan='5' row={x => (
                            <tr key={x.metadata.uid}>
                                <MetadataColumns
                                    item={x}
                                    href={`#/storageclass/${x.metadata.name}`}
                                />
                                <td>{x.reclaimPolicy}</td>
                                <td>{x.volumeBindingMode}</td>
                            </tr>
                        )} />
                    </table>
                </div>
            </div>
        );
    }
}
