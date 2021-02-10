import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card, Button, Statistic, Modal } from 'antd';
import { FaInfo } from "react-icons/fa";

import { getDetailsPokemon } from '../../services/detailsPokemon';
import './index.css';

const { Meta } = Card;

function CardPokemon({ pokemon }) {

    const [detailsPokemon, seDetailsokemon] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        getDetailsPokemon(pokemon.url).then((result) => {
            seDetailsokemon(result)
        })
    }, [pokemon])


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    console.log(detailsPokemon)
    return (
        <>
            {detailsPokemon.length !== 0 && (<>
                <Card
                    cover={
                        <img
                            alt="example"
                            src={detailsPokemon.sprites.other['official-artwork'].front_default}
                        />
                    }
                    actions={[
                        <FaInfo key="infor" type="button" onClick={showModal} />,
                    ]}
                >
                    <Meta
                        avatar={<Statistic title="Nº" value={detailsPokemon.id} />}
                        title={detailsPokemon.name.toUpperCase()}
                        description={<>
                            {detailsPokemon.types.map((type, index) =>
                                <Button key={index} type="primary" size="small" className="mr-1" id={`background-color-${type.type.name}`}>{type.type.name.toUpperCase()}</Button>
                            )}
                        </>}
                    />
                </Card>

                {/* <Modal
                    title={`${detailsPokemon.name.toUpperCase()} - Nº ${detailsPokemon.id}`}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Row>
                        <Col>
                            <img
                                alt={detailsPokemon.name}
                                width="70"
                                height="70"
                                src={detailsPokemon.sprites.other['dream_world'].front_default}
                            />
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Modal> */}
            </>)}

        </>
    );
}

export default CardPokemon;
